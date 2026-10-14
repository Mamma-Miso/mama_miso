const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id");
console.log("selectedID", selectedID);

const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedID}`;

const detailList = document.querySelector(".product_page_container");

function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}

function showDetails(details) {
  detailList.innerHTML = "";

  detailList.innerHTML += `<img
            src="https://kea-alt-del.dk/t7/images/webp/640/${details.id}.webp"
            alt="${details.productdisplayname}"
          />
          <div class="product_info ${details.soldout ? "soldout" : ""} ${details.discount ? "discount" : ""}">
            <div>
              <h2>${details.productdisplayname}</h2>
              <p class="articletype_brandname">${details.articletype} | ${details.brandname}</p>
            </div>
            <div>
              <p class="original_price">${details.price + " kr."}</p>
              <div class="new_price">
                <p>${details.discount ? getDiscountPrice(details.price, details.discount) + " kr." : ""}</p>
                <p class="discount_tag">${details.discount ? " -" + details.discount + "%" : ""}</p>
              </div>
            </div>
            <div class="info">
              <p><b>Colour:</b><br />${details.basecolour}</p>
            </div>
          </div>
          <div class="size">
            <form action="">
              <label for="size">Vælg størrelse:<br /><br /></label>
              <select name="size" id="size">
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>
              <br /><br />
              <input type="submit" value="Tilføj til kurv" />
            </form>
          </div>`;
}

getData(detailURL);
