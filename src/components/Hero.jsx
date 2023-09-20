import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
      
        <img 
          src={logo}
          alt='logo'
          className='w-28 object-contain'
        />
        <p className='flex flex-1 font-bold font-satoshi text-2xl '>siteSnap</p>
        <button 
          type='button' 
          onClick={ () => window.open("https://github.com/A-bhiSheKumar/siteSnap") }
          className='black_btn'
          >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Articles with 
        <br className='max-md:hidden' />
        <span className='orange_gradient'>GPT-4</span>
      </h1>

      <h2 className='desc'>
        Simplify your reading with siteSnap , an open-source article summarizer that transforms lengthy article into clear and concise summaries.
      </h2>
    </header>
  )
}

export default Hero