import React, { useEffect, useState } from "react";
export const CredentialsContext = React.createContext({
    storedCredentials:{},
    setStoredCredentials:()=>{}
});
