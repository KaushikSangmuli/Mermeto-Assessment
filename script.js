const vendor = document.querySelector("#product-vendor")
const productName= document.querySelector("#product-name")
const price = document.querySelector(".price")
const originalPrice =document.querySelector("#compared-price")
const colorBoxes = document.querySelectorAll(".box")
const colorBorder = document.querySelectorAll(".color-border")
const discription = document.querySelector("#discription-text")

let bgColor;  
let isColorSelected = false;
let isSizeSelected = false;

fetch(" https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json")
.then((data)=>{
    return data.json()
}).then((data)=>{
    return data.product
}).then((data)=>{
    vendor.innerText = data.vendor
    productName.innerText =data.title
    
    let finalPrice = parseFloat(data.price.replace("$", ""))  // convert value from string to number.
    let dscntPrice = parseFloat(data.compare_at_price.replace("$",""))
   
    price.innerHTML = `<span id="product-price"> $${finalPrice}</span> <span id="prcnt-discount">
    ${100-((finalPrice/dscntPrice)*100).toFixed(0)}%off</span>`;   //automatically calculate the % off.
    originalPrice.innerText = `$${dscntPrice}`

    colorBoxes.forEach((box, index)=>{
        let color = Object.values(data.options[0].values[index])
        box.style.backgroundColor = color   
    })

    colorBorder.forEach((border,index)=>{
        border.addEventListener("click", ()=>{
            colorBorder.forEach((border)=>{
                border.style.borderColor = ""     // remove the previous border from color button.
            })
            let color = Object.values(data.options[0].values[index])
            border.style.borderColor = color
        })
     
    })

    colorBoxes.forEach((box, index)=>{
        box.addEventListener("click",()=>{
            bgColor = Object.keys(data.options[0].values[index])
            isColorSelected =true       // to make sure that color is selected
        })
    })

    const dscrpt =  data.description
    const starting = dscrpt.indexOf(">") + ">".length  //customize the text starting from value.
    const ending = dscrpt.indexOf("</p>")         //customize the text ending from value.
    const dsc = dscrpt.substring(starting , ending)
    discription.innerText = dsc

})

colorBoxes.forEach((box) => {
    const img = box.querySelector(".tick-mark");
    box.addEventListener("click", () => {
        colorBoxes.forEach((box) => {
            box.querySelector(".tick-mark").classList.add("hidden");    // Hide all images
        });
        img.classList.remove("hidden");
        isColorSelected =true

    });
});

const sizes = document.querySelectorAll("input[name='size']")
let selectedSize;
sizes.forEach((size) =>{
    size.addEventListener("click", ()=>{
         selectedSize = size.value
         isSizeSelected = true   //make sure that size is selected
    })
})

const minus = document.querySelector("#minus")
const noOFItems = document.querySelector("#count")
const plus = document.querySelector("#plus")
let count = 1
noOFItems.innerText = count

minus.addEventListener("click",()=>{
    if (count>1){
        count--
        noOFItems.innerText = count
    }
})

plus.addEventListener("click", ()=>{
    count++
    noOFItems.innerText = count
})

const result = document.querySelector("#status")
const addToCart = document.querySelector("#cart-btn")
addToCart.addEventListener("click",()=>{
    result.classList.remove("hidden")
    if(!isColorSelected){
        result.innerText = ` choose the Color for product`
        result.style.color="red"
    } else if(!isSizeSelected){
        result.innerText = ` select the Size for product`
        result.style.color="red"
    } else if( isColorSelected && isSizeSelected ){
        result.innerText = ` ${productName.innerText} with Color ${bgColor} and Size ${selectedSize}  added to cart`
    } 
})