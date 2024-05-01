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
    console.log(data)
    return data.product
}).then((data)=>{
    vendor.innerText = data.vendor
    productName.innerText =data.title
    
    let finalPrice = parseFloat(data.price.replace("$", ""))
    let dscntPrice = parseFloat(data.compare_at_price.replace("$",""))
    console.log(finalPrice ,dscntPrice)
    price.innerHTML = `<span id="product-price"> $${finalPrice}</span> <span id="prcnt-discount">
    ${100-((finalPrice/dscntPrice)*100).toFixed(0)}%off</span>`;
    originalPrice.innerText = `$${dscntPrice}`

    colorBoxes.forEach((box, index)=>{
        let color = Object.values(data.options[0].values[index])
        box.style.backgroundColor = color
    })
    colorBorder.forEach((border,index)=>{

        border.addEventListener("click", ()=>{

            colorBorder.forEach((border)=>{
                border.style.borderColor = ""
            })
            let color = Object.values(data.options[0].values[index])
            border.style.borderColor = color
        })
     
    })

    colorBoxes.forEach((box, index)=>{
        box.addEventListener("click",()=>{
            bgColor = Object.keys(data.options[0].values[index])
            console.log(bgColor)
            isColorSelected =true
        })
    })

    const dscrpt =  data.description
    const starting = dscrpt.indexOf(">") + ">".length
    const ending = dscrpt.indexOf("</p>")
    const dsc = dscrpt.substring(starting , ending)
    discription.innerText = dsc

})
let reqcolor;
colorBoxes.forEach((box) => {
    const img = box.querySelector(".tick-mark");
    
    box.addEventListener("click", () => {
        // Hide all images
        colorBoxes.forEach((box) => {
            box.querySelector(".tick-mark").classList.add("hidden");
        });
        // Show the image inside the clicked box
        img.classList.remove("hidden");
        console.log("box is clicked", box, img);
        isColorSelected =true

    });
});

const sizes = document.querySelectorAll("input[name='size']")
let selectedSize;
sizes.forEach((size) =>{
    size.addEventListener("click", ()=>{
         selectedSize = size.value
         isSizeSelected = true
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
        console.log("minus clicked")
    }
})

plus.addEventListener("click", ()=>{
    count++
    noOFItems.innerText = count
    console.log("plus clicked")
   
})

const result = document.querySelector("#status")
const addToCart = document.querySelector("#cart-btn")
addToCart.addEventListener("click",()=>{
    result.classList.remove("hidden")
    if(!isColorSelected){
        result.innerText = ` select the Color for product`
    } else if(!isSizeSelected){
        result.innerText = ` select the Size for product`
    } else if( isColorSelected && isSizeSelected ){
        result.innerText = ` ${productName.innerText} with Color ${bgColor} and Size ${selectedSize}  added to cart`
        console.log("hello")
    } 
})