
/**
 * Alert function using bootstrap alert
 */
 const setAlert = ( message , type = 'danger') =>  {
    return `<p class="alert alert-${type} d-flex justify-content-between">${ message } <button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}








/**
 * Get all data from localstorage
 */
const readLSData  = (key) => {

    if( localStorage.getItem(key) ){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }

}


/**
 * Create data
 */
const createLSData = (key, value) => {

    // set initial value
    let data = [];

    // check key exists or not 
    if( localStorage.getItem(key) ){
        // get data from localstorage using data key
        data = JSON.parse(localStorage.getItem(key));
    }
    // push data to initial data variable
    data.push(value);

    // set data to localstorage  
    localStorage.setItem(key, JSON.stringify(data));
    

}

/**
 * Update Data
 */

const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array))
}


