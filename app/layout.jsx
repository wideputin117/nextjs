 // IMPORT GLOBAL STYLES
 import '@styles/globals.css'

 // exporting metadata
 export const metadata ={
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
 }

const RootLayout = ({ children }) => { // get children from prompts
  return (
     <html lang="en">
        <body>
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
               {children}
            </main>
        </body>
     </html>
  )
}

export default RootLayout;