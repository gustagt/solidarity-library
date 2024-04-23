import {createContext} from "react";

export const UrlContext = createContext();

export const UrlProvider = ({children}) => {

    // const url = "https://api.transcon.contagem.mg.gov.br/biblio";
    const url = "http://10.101.23.197:8001";

    return(
        <UrlContext.Provider value={url}>
            {children}
        </UrlContext.Provider>
    )
}