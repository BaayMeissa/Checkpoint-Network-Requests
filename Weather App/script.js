//Import des bibliotheques axios, express

const axios = require('axios');
const express = require("express")
//cCreation d'une app avec express
const app = express();
//definition du moteur de vues sur ejs
app.set('view engine','ejs');
app.use(express.static('public'))

const port = 3001;

/*
Definition d'une fonction asynchrone getWeather qui:
    -prend en fonction le nom d'une ville;
    -key qui represente la clé de l'API et uri l'url complet avec city ,la ville donnée en argument;
*/
const getWeather = async (city) => {
    try {
        const key = "9841aee6a45318a35c23c83c364716c3";
        const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
        //axios.get(uri) retourne une promesse, d'ou l'utilisation de Await
        const response = await axios.get(uri);
        const data = response.data;
        //Dans l'objet data, il y a un autre objet main qui contient temp
        //Il y aussi un array qui s'appelle weather dont le premier element contient la description du meteo actuel
        return {
            temp:data.main.temp,
            desc:data.weather[0].description
        }
    } catch (error) {
        console.error(error)
    }
}

//requete get sur la racine
app.get("/",async(req,res)=>{
    //req.query permet de recuperer les parametres de requete
    let city = req.query.city;
    let meteo = await getWeather(city);
    //temp,description et city seront utilises plus tard dans le html
    res.render('index',{temp:meteo.temp, description:meteo.desc, city:city});
})

app.listen(port)