import './LandingLoader.css';

const LandingLoader = ({ hiding }) => (
  <div className={`ln-loader${hiding ? ' ln-loader--hide' : ''}`}>
    <svg className="ln-loader-logo" width="40" height="40" viewBox="0 0 32 32"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 29 L3 13 L6 3 L13 8.5 L16 10 L19 8.5 L26 3 L29 13 Z M9.5 14.5 L14 14.5 L11.75 19 Z M18 14.5 L22.5 14.5 L20.25 19 Z" fill="white" fillRule="evenodd" />
    </svg>
  </div>
);

export default LandingLoader;
