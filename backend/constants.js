const express = require('express')

const Soclist = new Set(["sarasva" , "rangtarangini"]);

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