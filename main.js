/// <reference path="jquery-3.6.1.js" />

"use strict";

(() => {

    const titleMap = new Map();
    const titleLengthsMap = new Map();
    
    $("#trigger").click(async () => {
        const photos = await getJson("https://jsonplaceholder.typicode.com/photos");
        displayTask(photos)
    })

    function displayTask(photos) {
        let album2PhotoCount = 0;
        const titles = []

        for (const photo of photos) {
            if (photo.albumId === 1) {
                $("#form-table-body").append(`
                    <tr>
                        <td>${photo.albumId}</td>
                        <td>${photo.id}</td>
                        <td><img src="${photo.thumbnailUrl}"></td>
                    </tr>
                `)
            }
            else if (photo.albumId === 2) {
                album2PhotoCount++
            }
            if (photo.title.includes("laudantium")) {
                titles.push(photo.title)
            }
        }

        $("body").append($('p')).append(`Sum of pictures in album 2: ${album2PhotoCount} photos<hr>`)

        $("body").append($('p')).append(`Sum of all the pictures: ${photos.length} photos<hr>`)

        if (titles[0] != "") {
            $("body").append($(`<ul id="ulList"></ul>`))
            for (const title of titles) {
                $("#ulList").append("li").append(title + "<br>")
            }
            $("body").append(`<hr>`)
        }

        challenge2(photos)

        $("body").append($(`
            <table class="table" id="challenge2">
                <thead>
                    <tr>
                        <th>Title Length</th>
                        <th>Total Titles Containing That Length</th>
                    </tr>
                </thead>
                <tbody id="challenge2Body"></tbody>
            </table>
        `))

        const mapKeys = titleLengthsMap.keys()

        titleLengthsMap.forEach(value => {
            $("#challenge2Body").append(`
                <tr>
                    <td>${mapKeys.next().value}</td>
                    <td>${value}</td>
                </tr>
            `)
        })
        console.log(titleLengthsMap.keys(0))

        
    }

    function challenge2(titleArr) {
        if(titleArr.length !== 0) {
            for (const photo of titleArr) {
                titleMap.set(photo.title, photo.title.length)
            }
            console.log(titleMap)
        }

        let count = 1;
        let check = 0;
        if(titleMap.size > 0) {
            titleMap.forEach(title => {
                if(!titleLengthsMap.has(title)) {
                    titleLengthsMap.set(title, count)
                }
                else if(titleLengthsMap.has(title)) {
                    let value = titleLengthsMap.get(title)
                    titleLengthsMap.delete(title)
                    value++
                    titleLengthsMap.set(title, value)
                }
            })

            titleLengthsMap.forEach(title => {
                check += title
            })
            console.log(titleLengthsMap)
            console.log("Check: " + check)

        }
    }

    async function getJson(url) {
        const response = await fetch(url)
        const json = await response.json()
        return json;
    }

})();