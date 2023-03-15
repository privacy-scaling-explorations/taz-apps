import React, { useEffect } from 'react';

const PretixWidget = ({ event, subevent }) => {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://pretix.eu/widget/v1.en.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      }
    }
  }, []);

  return (
    <>
      <link rel="stylesheet" type="text/css" href="https://pretix.eu/taz-zuzalu/ticket/widget/v1.css" />
      {typeof window !== 'undefined' && <pretix-widget event={event} subevent={subevent}></pretix-widget>}
      <noscript>
        <div className="pretix-widget">
          <div className="pretix-widget-info-message">
            JavaScript is disabled in your browser. To access our ticket shop without JavaScript, please <a target="_blank" rel="noopener" href={`https://pretix.eu/taz-zuzalu/ticket/${subevent}/`}>click here</a>.
          </div>
        </div>
      </noscript>
    </>
  );
};

export default PretixWidget;
