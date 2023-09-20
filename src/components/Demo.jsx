// here all the magic happens

import { useState , useEffect } from "react";

import {copy , linkIcon ,loader , tick} from '../assets';

// importing the hooks(redux stuff)
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const[article , setArticle] = useState({
    url: '',
    summary: '',
  });

  // String all article
  const [allArticles , setAllArticles] = useState([]);

  // copy useState
  const [ copied , setCopied] = useState("");

  const [getSummary , {error , isFetching}] = useLazyGetSummaryQuery();

  // making localStorage for our articles
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('article')
    )
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage) //it only added to our state if data is present 
    }
  } , [])

  const handleSumbit = async (e) => {

    // handle the reload ..never miss this small thing
    e.preventDefault();

    const {data} = await getSummary ({articleUrl : article.url});

    if(data?.summary) {
      const newArticle = { ...article , summary: data.summary};
      // pushing all stored articles
      const updatedAllArticles = [newArticle , ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);


      localStorage.setItem('article' , JSON.stringify(updatedAllArticles));
    }
  } 

  // implementing copy to clipBoard functinality..
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    //buildin navigator that perfoms the copyToclipboard
    navigator.clipboard.writeText(copyUrl);
    //setTime for succesfull animation
    setTimeout(() => setCopied("") , 2000 );
  }

  return (
    <section className="mt-16 w-full max-w-xl ">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form 
          className="relative flex justify-center items-center"
          onSubmit={handleSumbit}
        >
          <img 
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input 
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({...article , url: e.target.value})}
            required
            className="url_input peer" 
            // peer dive it
          />

          <button 
            type="sumbit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
          ↵
          </button>
        </form>

        {/* Browser URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item , index) => (
            <div 
              key={`link-${index}`} // 
              onClick={ () => setArticle(item)} //call the set article
              className="link_card"
              >
              <div className="copy_btn" onClick={ ()=>
                handleCopy(item.url)}>
                <img 
                  src={copied === item.url ? tick : copy}
                  alt="copyIcon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      <div />

        {/* Display Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
            {/* this below code is responsible for reload showcase , error and at last display the summary */}
            {isFetching ? (<img src={loader} alt="loader" className="w-20 h-20 object-contain" />) 
              : error ? (
                <p className="font-inter font-bold text-black text-center">
                  Well, that wasn't supposed to happen ...
                  <br />
                  <span className="font-satoshi font-normal text-gray-700">
                    {error?.data?.error}
                  </span>
                </p>
              ) : (
                article.summary && (
                  <div className="flex- flex-col gap-3">
                    <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                      Article <span className="blue_gradient">summary</span>
                    </h2>

                    {/* render a article summary */}
                    <div className="summary_box">
                      <p className="font-inter font-medium text-sm text-gray-700"> 
                        {article.summary}
                      </p>
                    </div>
                  </div>
                )
              )
            }
        </div>

      </div>
    </section>
  )
}

export default Demo