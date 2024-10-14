const express = require('express')

const Soclist = new Set(["sarasva" ,"effervescence", "rangtarangini" , "virtuosi" , "tesla" , "geekhaven", "ams", "nirmiti" , "geneticxcrew", "gravity" , "spirit"]);

function check(society){
    return Soclist.has(society)
}

function add(society){
    Soclist.add(society)
}

module.exports = {
    check,
    add,
};