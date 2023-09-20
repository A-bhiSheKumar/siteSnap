import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  // State to manage the article URL and summary
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  // State to store all fetched articles
  const [allArticles, setAllArticles] = useState([]);

  // State to manage copied URL
  const [copied, setCopied] = useState("");

  // Redux Toolkit Query hook to fetch article summaries
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load articles from local storage when the component mounts
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('article'));
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // Function to handle form submission
  const handleSumbit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem('article', JSON.stringify(updatedAllArticles));
    }
  }

  // Function to copy URL to clipboard
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(""), 2000);
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
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        {/* Browser URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
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
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          ) : error ? (
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
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Demo;


//Summary of the Code

//1.)Imports: Import necessary modules, components, and assets.

//2.)Component State: Use useState to manage the component's state. article stores the URL and 
//summary of the current article, allArticles stores all fetched articles, and copied manages the copied URL.

//3.)Redux Toolkit Query Hook: Use the useLazyGetSummaryQuery hook from Redux Toolkit Query to fetch 
//article summaries.

//4.)Use Effect for Local Storage: Load articles from local storage when the component mounts using useEffect.

//5.)Handle Form Submission: handleSumbit is an asynchronous function that handles form submissions. 
//It fetches the summary of the article URL provided, updates the state, and stores the articles in local
// storage.

//6.)Copy to Clipboard: handleCopy function copies a URL to the clipboard and provides visual feedback.

//7.)Render JSX: Render the user interface with HTML and JSX. It includes a form for entering URLs, 
//displaying a history of articles, and showing article summaries.

//The form allows users to enter article URLs.
//The history section displays previously fetched articles.
//The results section displays the article summary or error messages.
//This code represents a React component that allows users to enter article URLs, 
//fetch summaries, store articles in local storage, and copy URLs to the clipboard. 
//It includes error handling and feedback for loading and copying.




