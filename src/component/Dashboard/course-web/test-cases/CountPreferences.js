function noOfTruePreferences(first, second, third){

    if(first === true && second === true && third === true){
        return(3);
    }else{
        return("Less than 3");
    }

}

module.exports = noOfTruePreferences;