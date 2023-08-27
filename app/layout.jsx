 // IMPORT GLOBAL STYLES
 import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';


 // exporting metadata
 export const metadata ={
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
 }

const RootLayout = ({ children }) => { // get children from prompts
  return (
     <html lang="en">
        <body>
         <Provider>
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
               {/*Nav component here*/}
               <Nav />
               {children}
            </main>
            </Provider>
        </body>
     </html>
  )
}

export default RootLayout;