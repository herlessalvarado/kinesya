import { useState, useEffect } from 'react';
import { API_COUNTRIES } from '../commons/constants';
interface CountryType {
    name: string;
  }

export function useCountries() {
    const [countries, setCountries] = useState<Array<CountryType>>([]);
  
    useEffect(() => {
      let suscribe = true
      if (suscribe){
          fetch(API_COUNTRIES)
          .then(result => result.json())
          .then(result => { 

              setCountries(Object.keys(result).map((key:any) => <CountryType>{ name: result[key].item[0].name}))
          })
      }
      return () => {
        suscribe = false
      };
    },[]);
  
    return countries;
  }