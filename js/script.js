// Get all elements using DOM selection
const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single-product');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');




// get all products from localstorage
const getAllProducts = () => {

    // get all data from localstorage 
    const data = readLSData('product');

    // check localstorage, data avilable or not
    if( !data ){
    // send data to data table where listed all data
        product_list.innerHTML = `
            <tr>
                <td colspan="7" class="text-center"> No product found </td>
            </tr>
        `;
    }


    // get all data from localstorage 
    if( data ){

        // set empty initial value
        let list = '';

        // set 0 initial value
        let final_amount = 0;

        // show all data using map loop
        data.map((item, index) => {

            // calculation final_amount data and send to variable where set initial value
            final_amount += ( item.price *  item.quantity );
            // send list data to list variable where set initial value empty
            list += `
            <tr>
                <td>${  index + 1 }</td>
                <td><img style="width: 60px; height:60px; object-fit:cover; border-radius:4px;" src="${ item.photo }" alt=""></td>
                <td>${ item.name }</td>
                <td>${ item.price } BDT</td>
                <td>${ item.quantity }</td>
                <td>${ item.price * item.quantity } BDT</td>
                <td>
                    <a class="btn btn-info btn-sm product-view" data-bs-toggle="modal" product_index="${index}" href="#shop_single_modal"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-warning btn-sm product-edit" product_index="${index}" data-bs-toggle="modal" href="#shop_edit_modal"><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm product-delete" product_index="${index}" href=""><i class="fas fa-trash"></i></a>
                </td>
            </tr>
            `;

        });

        list += `<tr>
            <td colspan="6" class="text-end">Final Amount = ${final_amount} BDT</td>
            <td></td>
        </tr>`;
        
        // send all listed data in product_list element
        product_list.innerHTML = list;

    }





}

    // call getAllproducts otherwise it doesn't work
    getAllProducts();

    // submit product form for storing data
    product_form.onsubmit = (e) => {
        e.preventDefault();

        // get all data from input field 
        let form_data = new FormData(e.target);

        // send all data to Object
        let productData = Object.fromEntries(form_data.entries());

        // array distrcture
        let { name, price, photo, quantity } = Object.fromEntries(form_data.entries());



        
        // form validation 
        if( !name || !price || !photo || !quantity ) {
            // send validation message using setAlert function
            msg.innerHTML = setAlert('All fields are required !'); 
        }else {

            // create data in localstorage (key,value)
            createLSData('product', productData);

            // send validation message using setAlert function
            msg.innerHTML = setAlert('Data stable !', 'success');

            // reset form when data has been successfully created
            e.target.reset(); 

            // read all data from localstorage
            getAllProducts();
        }



    }

/**
 * Read data 
 */

product_list.onclick = (e) => {
    e.preventDefault(); 

    // check if product-view class avilable
    if( e.target.classList.contains('product-view') ){

         // get index using getAtrribute
        let index = e.target.getAttribute('product_index');

        // read all data from localstorage
        let data = readLSData('product');

        // data distructure 
        const { name, price, photo } = data[index];

        // send data to single product modal 
        single_product.innerHTML = `
            <img style="width: 250px; height: 250px; border-radius: 50%;" class="shadow" src="${ photo }" alt="">
            <h1>${ name }</h1>
            <p>Price : ${ price } BDT</p>
        `;

    }
    

    /**
     * Edit Data
     */

// check if product-edit class avilable
if( e.target.classList.contains('product-edit') ){

    // get product index from product table
    let index = e.target.getAttribute('product_index');

    // read all data from localstorage
    let data = readLSData('product');

    // array distructuring
    const { name, price, photo, quantity } = data[index];

    // send data in product update form
    product_update_form.innerHTML = `<div class="my-3">
        <label for="">Name</label>
        <input name="name" type="text" value="${ name }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Price</label>
            <input name="price" type="text" value="${ price }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Quantity</label>
            <input name="quantity" type="text" value="${ quantity }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Quantity</label>
            <input name="index" type="hidden" value="${ index }" class="form-control">
        </div>
        <div class="my-3">
            <img class="w-100" src="${ photo }" alt="">
        </div>
        <div class="my-3">
            <label for="">Photo</label>
            <input name="photo" type="text" value="${ photo }" class="form-control">
        </div>
        <div class="my-3">
            <input type="submit" class="btn btn-primary w-100" value="Update now">
        </div>
    `;


    }

    /**
     *  Delete Data
     */
    if(e.target.classList.contains('product-delete')){

        //get product index
        let index = e.target.getAttribute('product_index');

        //read all data from local storage
        let data = readLSData('product');

        // splice data using data index
        data.splice(index,1);

        // update data after splice
        updateLSData('product',data);

        // reload data after data delete
        getAllProducts();
    }

   
    


}







/**
 * Update 
 */

product_update_form.onsubmit = (e) => {
    e.preventDefault();

    // get all data from product_submit_form
    const form_data = new FormData(e.target);

    // distructure
    const { name, price, quantity, photo, index } = Object.fromEntries(form_data.entries());


    // get all data from localstorage 
    let all_data = readLSData('product');

    // 
    all_data[index] = { name, price, quantity, photo };

    // update data 
    updateLSData('product', all_data);

    // reload data after submit update form
    getAllProducts();
    
}

