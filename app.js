//Let's start
const wrapper = document.getElementById('wrapper')
const cross = document.getElementById('cross')
const box = document.getElementById('box')
const icon = document.getElementById('icon')
const remove = document.getElementById('remove')
const realitems = document.getElementById('realitems')
const items = document.getElementById("items")



icon.addEventListener("click", function () {
    box.classList.add("boxhover")
    cross.classList.add("crosshover")
    remove.classList.add("ctt")
    realitems.classList.remove("displayremover")
    items.classList.add("displayremover")
})

const bh = document.getElementsByClassName('boxhover')
const ch = document.getElementsByClassName('crosshover')

cross.addEventListener("click", function () {
    if (bh.length > 0 && ch.length > 0) {
        box.classList.remove("boxhover")
        cross.classList.remove("crosshover")
        remove.classList.remove("ctt")
        realitems.classList.remove("slowappear")
        realitems.classList.add("displayremover")
        items.classList.remove("displayremover")
    }
    else {
        box.classList.add("boxhover")
        cross.classList.add("crosshover")
        remove.classList.add("ctt")
        realitems.classList.remove("displayremover")
        items.classList.add("displayremover")
    }
})

box.addEventListener("keyup", function (event) {
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
    if (event.keyCode === 13) {
        console.log("pressed")
        const article = event.target.value.toLowerCase()
        url = url + article

        var ifthere = document.getElementsByClassName('added')

        console.log(ifthere)

        if (ifthere.length == 10) {
            while (realitems.firstChild) {
                realitems.removeChild(realitems.firstChild);
            }
        }


        fetch(url)
            .then(response => response.json())
            .then(data => {

                const sorted = []
                const keys = Object.keys(data.query.pages)

                for (let i = 0; i < keys.length; i++) {
                    for (let j = 0; j < keys.length; j++) {
                        if (data.query.pages[keys[j]]["index"] == i + 1) {
                            sorted.push(data.query.pages[keys[j]])
                        }
                    }
                }

                console.log(sorted)



                for (let i = 0; i < keys.length; i++) {
                    var childdiv = document.createElement("div")
                    childdiv.classList.add("added")
                    childdiv.innerHTML =
                        `<a href="https://en.wikipedia.org/?curid=${sorted[i]["pageid"]}"><div class="title">${sorted[i]["title"]}</div><div>${sorted[i]["extract"]}</div></a><br><br>`
                    realitems.appendChild(childdiv)
                }

                items.classList.add("displayremover")

                realitems.classList.add("slowappear")

            })

    }
});
