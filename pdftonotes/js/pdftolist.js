var userPDF;
const BLACKLIST=['\u200b','\t','\n',',' ,"'" ,"-" ,String.fromCharCode(160) ,String.fromCharCode(8239),':','≠','"','(',')','”'];
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    // $('#pageNumberDetection').click();
    function showInfoBanner() {
        setTimeout(function () {
            $('#infoBanner').show(500);
        }, 2000);
        setTimeout(function () {
            $('#infoBanner').hide(500);
        }, 7000);
    }
    $("[name='bsswitch']").bootstrapSwitch();
    showInfoBanner();
    var badWords = [];
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    var result_PDF;
    var nastyWords = [];
    var suggestedSplitters=[];
    var firstChars = [];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
    $('input[type="file"]').change(function (e) {
        var fileName = (e.target.files[0]) ? e.target.files[0].name : "Click to select file (or drag and drop)";
        userPDF = e.target.files[0];
        if (userPDF.type != "application/pdf") {
            console.error(userPDF.name, "is not a pdf file.")
            alert(userPDF.name+ " is not a pdf file.");
            return;
        }
        $('#filename').text(fileName);


        console.log('The file "' + fileName + '" has been selected.');
        $('#loadingData').text('Splitters');
        $('#loadingBanner').show(100);
        firstChars = [];
        detectSplitters();
    });
    $('.options').hide();
    $('#btnOptions').click(function () {
        if ($('.options').css('display') == 'none') {
            $('.options').show();
        } else {
            $('.options').hide();
        }
    })
    var result;
    $('.suggestedSplitter').click(function(e){
        this.innerText="";
    })
    $('#suggestedSplitterBtn').click(function(){
        var tmp=$('#suggestedSplitterBtn_text').text();
        $('#suggestedSplitterBtn_text').text('Copied the text: '+suggestedSplitters.join('')+'\t');
        setTimeout(function(){
            $('#suggestedSplitterBtn_text').text(tmp);
        },2500);
        for(var i=1;i<=suggestedSplitters.length;i++){
            $('#suggestedSplitter'+i).text(suggestedSplitters[i-1]);
        }
        const textArea = document.createElement('textarea');
        textArea.textContent = suggestedSplitters.join('');
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
    })
    $('#btnCopy').click(function () {
        const copyText = document.getElementById("result").textContent;
        const textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
        $('#btnCopy').text("Copied to clipboard");

        setTimeout(function () {
            $('#btnCopy').text("Copy to clipboard");
        }, 2000);
    });
    $('#btnConvert').click(function () {
        $('#loadingData').text('Result');
        $('#loadingBanner').show(100);
        firstChars = [];
        var headerDelim = ($('#headerDelim').is(':checked')) ? true : false;
        var finalText_array = [];
        var finalText = "";
        var fileReader = new FileReader();
        var pageStart = parseInt($('#pageStart').val());
        var pageEnd = parseInt($('#pageEnd').val());
        var excludeStart = parseInt($('#excludeStart').val());
        var excludeEnd = parseInt($('#excludeEnd').val());
        var ignoreThreshold = parseInt($('#ignoreThreshold').val());
        if (ignoreThreshold == NaN) ignoreThreshold = 0;
        badWords = $('#badWords').val().split(',');
        nastyWords = $('#nastyWords').val().split(',');
        fileReader.onload = function () {
            var typedarray = new Uint8Array(this.result);

            // var pdfjs = pdfjsLib.getDocument(typedarray)
            pdfjsLib.getDocument(typedarray).then(function (pdf) {
                // you can now use *pdf* here
                if (isNaN(pageEnd) || pageEnd == 0) pageEnd = pdf.numPages;
                if (isNaN(pageStart) || pageStart == 0) pageStart = 1;
                if (isNaN(excludeEnd)) excludeEnd = 0;
                if (isNaN(excludeStart)) excludeStart = 0;
                var count = pageStart;
                for (var i = 0; i < pageStart; i++) {
                    finalText_array[i] = "EMPTYPAGE";
                }
                for (var i = pageStart; i <= pageEnd; i++) {
                    getPageText(pdf, i, excludeStart, excludeEnd, ignoreThreshold, function (result, index) {
                        finalText_array[index] = result;
                        if (finalText_array.length - 1 === pageEnd && finalText_array.every(element => element !== null)) {
                            // console.log(firstChars);

                            convertFromPDF(finalText_array.join('').replace(/EMPTYPAGE/g, ''));
                        }

                    });
                }

            });
        };


        fileReader.readAsArrayBuffer(userPDF);
        // console.log(userText);
        // userText=convertText(userText);

        // result = userText;
        // console.log(userText);

    });
    $('#btnSplitters').click(function () {
        detectSplitters();

        // console.log(userText);
        // userText=convertText(userText);

        // result = userText;
        // console.log(userText);

    });
    function detectSplitters() {
        var headerDelim = ($('#headerDelim').is(':checked')) ? true : false;
        var finalText_array = [];
        var finalText = "";
        var fileReader = new FileReader();
        var pageStart = parseInt($('#pageStart').val());
        var pageEnd = parseInt($('#pageEnd').val());
        var excludeStart = parseInt($('#excludeStart').val());
        var excludeEnd = parseInt($('#excludeEnd').val());
        var ignoreThreshold = parseInt($('#ignoreThreshold').val());
        if (ignoreThreshold == NaN) ignoreThreshold = 0;
        badWords = $('#badWords').val().split(',');
        nastyWords = $('#nastyWords').val().split(',');
        fileReader.onload = function () {
            var typedarray = new Uint8Array(this.result);

            // var pdfjs = pdfjsLib.getDocument(typedarray)
            pdfjsLib.getDocument(typedarray).then(function (pdf) {
                // you can now use *pdf* here
                if (isNaN(pageEnd) || pageEnd == 0) pageEnd = pdf.numPages;
                if (isNaN(pageStart) || pageStart == 0) pageStart = 1;
                if (isNaN(excludeEnd)) excludeEnd = 0;
                if (isNaN(excludeStart)) excludeStart = 0;
                var count = pageStart;
                for (var i = 0; i < pageStart; i++) {
                    finalText_array[i] = "EMPTYPAGE";
                }
                for (var i = pageStart; i <= pageEnd; i++) {

                    getPageText(pdf, i, excludeStart, excludeEnd, ignoreThreshold, function (result, index) {
                        // console.log(result);
                        finalText_array[index] = result;
                        if (finalText_array.length - 1 === pageEnd && finalText_array.every(element => element !== null)) {
                            if (finalText_array.every(element => element === "EMPTYPAGE")) {
                                alert("Couldn't detect any text in that file.");
                            }
                            var foundSplitters = {};
                            for (x in firstChars) {
                                if (firstChars[x].substring(0, 1) == ' ') {
                                    firstChars[x] = firstChars[x].substring(1, firstChars[x].length);
                                }
                                if (firstChars[x].substring(firstChars[x].length - 1, firstChars[x].length) == ' ') {
                                    firstChars[x] = firstChars[x].substring(0, firstChars[x].length - 1);
                                }
                                if (firstChars[x].match(/[0-9]/i)) {
                                    firstChars[x] = "NUM";
                                }
                            }
                            for (x in firstChars) {
                                var splitterExists = false;
                                $.each(foundSplitters, function (key, value) {
                                    if (firstChars[x] == key) {
                                        foundSplitters[key] = value + 1;
                                        splitterExists = true;
                                    }
                                });
                                if (!splitterExists) {
                                    foundSplitters[firstChars[x]] = 1;
                                }
                            }

                            // console.log(JSON.stringify(foundSplitters));
                            while (Object.keys(foundSplitters).length >= 8) {
                                var lowestVal;
                                var lowestVal_value = Number.MAX_SAFE_INTEGER;
                                $.each(foundSplitters, function (key, value) {
                                    if (foundSplitters[key] < lowestVal_value) {
                                        lowestVal = key;
                                        lowestVal_value = foundSplitters[key];
                                    }
                                });
                                delete foundSplitters[lowestVal];
                            }
                            var splitterDisplayCount = 1;
                            for (var splitterResetCount = 1; splitterResetCount <= 4; splitterResetCount++) {
                                $('#suggestedSplitter' + splitterResetCount).text('');
                            }
                            suggestedSplitters=[];
                            while (Object.keys(foundSplitters).length > 0) {
                                var highestVal;
                                var highestVal_value = -1;
                                $.each(foundSplitters, function (key, value) {
                                    if (foundSplitters[key] > highestVal_value) {
                                        highestVal = key;
                                        highestVal_value = foundSplitters[key];
                                    }
                                });
                                if (highestVal_value > 2 && splitterDisplayCount <= 4 &&highestVal!="") {
                                    // console.log(highestVal);
                                    var blacklisted=false;
                                    for(var blk=0;blk<BLACKLIST.length;blk++){
                                        if(highestVal.indexOf(BLACKLIST[blk])!=-1){
                                            blacklisted=true;
                                            break;
                                        }
                                    }
                                    if(!blacklisted){
                                        $('#suggestedSplitter' + splitterDisplayCount).text(highestVal);
                                        splitterDisplayCount++;
                                        suggestedSplitters.push(highestVal);
                                    }
                                    
                                }

                                delete foundSplitters[highestVal];
                            }
                            $('#loadingBanner').hide(250);
                        }

                    });
                }

            });
        };


        fileReader.readAsArrayBuffer(userPDF);
    }
    function getPageText(pdf, i, excludeStart, excludeEnd, ignore, callback) {
        var finalText = "";

        var addTab = false;
        var headerDelim = ($('#splitter1').val() == 'BIG') ? true : false;
        pdf.getPage(i).then(function (page) {
            // you can now use *page* here
            page.getTextContent().then(function (textContent) {
                var ignored = false;
                // console.log(textContent);
                var charCount = 0;
                var nastyWord = false;
                for (var j = 0; j < textContent.items.length; j++) {
                    if (textContent.items[j].str.substring(0, 1).match(/[a-z]/i) || textContent.items[j].str.substring(1, 2).match(/[a-z]/i)) {

                    } else {
                        firstChars.push(textContent.items[j].str.substring(0, 2));
                    }
                    for (var k = 0; k < nastyWords.length; k++) {
                        if (nastyWords[k].length > 1 && textContent.items[j].str.indexOf(nastyWords[k]) != -1) {
                            nastyWord = true;
                            // break;
                        }
                    }
                    charCount += textContent.items[j].str.indexOf(nastyWord) != -1;
                    charCount += textContent.items[j].str.length;
                }
                if (charCount < ignore || nastyWord) {
                    ignored = true;
                }
                if (!$('#addNewLine').is(':checked')) finalText += '\n';
                for (var j = excludeStart; j < textContent.items.length - excludeEnd; j++) {
                    var detectNumber = textContent.items[j].str.replace(/ /g, "");
                    var parsedInt = parseInt(detectNumber);
                    if ($('#pageNumberDetection').is(':checked') && detectNumber.indexOf('.') == -1 && !isNaN(parsedInt) && detectNumber.length < 3) {
                        continue;
                    } else {
                        var textItem = textContent.items[j].str;
                        var remove = false;
                        for (var k = 0; k < badWords.length; k++) {
                            if (textItem.indexOf(badWords[k]) != -1 && badWords[k].length >= textItem.length / 2) {
                                remove = true;
                                break;
                            }
                        }
                        if (remove) {
                            continue;
                        } else {
                            if (textItem == ' ') {
                                addTab = false;
                            }
                            if ($('#addNewLine').is(':checked') && (textItem.length > 150 || textContent.items[j].height > 10)) {
                                finalText += '\n';
                                addTab = true;
                            } else if (headerDelim && addTab && textItem != ' ') {
                                finalText += '\t'
                                addTab = false;
                            }
                            if (($('#splitter3').val() == 'NUM' || $('#splitter2').val() == 'NUM' || $('#splitter1').val() == 'NUM') && textItem.length > 3) {
                                for (var index = 100; index > 0; index--) {
                                    if (textItem.indexOf(index + $('#numDelim').val()) != -1 && (index + $('#numDelim').val()).length * 4 <= textItem.length) {
                                        if (textItem.substring(0, index / 10 + 1 + $('#numDelim').val().length) !== index + $('#numDelim').val()) {
                                            textItem = textItem.replace(index + $('#numDelim').val(), index + "PLA.'CEHOLDER" + $('#numDelim').val());
                                        }

                                    }
                                }
                            }
                            finalText += textItem;
                        }
                    }

                }
                (ignored) ? callback('EMPTYPAGE', i) : callback(finalText, i);
                // console.log(finalText);
            })

        });
    }
    function convertFromPDF(text) {
        result_PDF = convertText(text);
        $('#loadingBanner').hide(250);
        $('#result').text(result_PDF);
    }
    function convertText(userText) {
        var headerDelim = ($('#splitter1').val() == 'BIG') ? true : false;
        // console.log(userText);
        var useSuggestedSplitters = false;
        var split1 = $('#splitter1').val().split(',');
        var split2 = $('#splitter2').val().split(',');
        var split3 = $('#splitter3').val().split(',');
        if ((split1.length == 0 || (split1.length == 1 && split1[0] == '')) && (split2.length == 0 || (split2.length == 1 && split2[0] == '')) && (split3.length == 0 || (split3.length == 1 && split3[0] == ''))) {
            useSuggestedSplitters = true;
            setTimeout(function () {
                $('#suggestedBanner').show(250);
            }, 1);
            setTimeout(function () {
                $('#suggestedBanner').hide(250);
            }, 3000);
            split1 = [];
            split2 = [];
            split3 = [];
            for (var i = 1; i <= 4; i++) {
                if ($('#suggestedSplitter' + i).text().length > 0) {
                    if (i <= 2) split1.push($('#suggestedSplitter' + i).text());
                    else if (i == 3) split2.push($('#suggestedSplitter' + i).text());
                    else split3.push($('#suggestedSplitter' + i).text());
                }
            }
        }

        for (x in split1) {
            if (split1[x].match(/[0-9]/i)) {
                split1[x] = "NUM";
                break;
            }
        }
        for (x in split2) {
            if (split2[x].match(/[0-9]/i)) {
                split2[x] = "NUM";
                break;
            }
        }
        for (x in split3) {
            if (split3[x].match(/[0-9]/i)) {
                split3[x] = "NUM";
                break;
            }
        }

        var numDelim = $('#numDelim').val();
        if (split1 == "NUM") {
            if (split2 == "NUM" || split3 == "NUM") {
                alert("Only use one splitter for Numbered input");
                return;
            }
        } else if (split2 == "NUM" && split3 == "NUM") {
            alert("Only use one splitter for Numbered input");
            return;
        }
        var splitterCount = 0;
        if (split3.length > 0 && split3[0] != "") {
            splitterCount = 3;
        } else if (split2.length > 0 && split2[0] != "") {
            splitterCount = 2;
        } else if (split1.length > 0 && split1[0] != "") {
            splitterCount = 1;
        }
        if (splitterCount > 2) {
            for (splitter in split3) {
                while (split3[splitter] != "NUM" && split3[splitter] != "" && userText.indexOf(split3[splitter]) != -1) {
                    userText = userText.replace(split3[splitter], "\n\t\t\t");
                }
            }
        }
        var keepReplacing = true;
        while (splitterCount > 2 && split3.indexOf("NUM") != -1 && keepReplacing) {
            keepReplacing = false;
            for (var i = 100; i > 0; i--) {
                if (userText.indexOf(i + numDelim) != -1) keepReplacing = true;
                userText = userText.replace(i + numDelim, "\n\t\t\t");
            }
        }
        keepReplacing = true;
        if (splitterCount > 1) {
            for (splitter in split2) {
                while (split2[splitter] != "NUM" && split2[splitter] != "" && userText.indexOf(split2[splitter]) != -1) {
                    userText = userText.replace(split2[splitter], "\n\t\t");
                }
            }
        }
        while (splitterCount > 1 && split2.indexOf("NUM") != -1 && keepReplacing) {
            keepReplacing = false;
            for (var i = 100; i > 0; i--) {
                if (userText.indexOf(i + numDelim) != -1) keepReplacing = true;
                userText = userText.replace(i + numDelim, "\n\t\t");
            }
        }
        keepReplacing = true;
        if (splitterCount > 0) {
            for (splitter in split1) {
                while (split1[splitter] != "NUM" && split1[splitter] != "" && userText.indexOf(split1[splitter]) != -1) {
                    userText = userText.replace(split1[splitter], "\n\t");
                }
            }
        }
        while (splitterCount > 0 && split1.indexOf("NUM") != -1 && keepReplacing) {
            keepReplacing = false;
            for (var i = 100; i > 0; i--) {
                if (userText.indexOf(i + numDelim) != -1) keepReplacing = true;
                userText = userText.replace(i + numDelim, "\n\t");
            }
        }
        var userTextArray = userText.split('\n');
        var elementsToRemove = [];
        for (var i = 0; i < userTextArray.length; i++) {
            while (userTextArray[i].indexOf(' ') == 0) {
                userTextArray[i] = userTextArray[i].replace(' ', '');
            }
            if (userTextArray[i] == "") {
                elementsToRemove.push(i);
            }
        }
        for (var i = elementsToRemove.length - 1; i >= 0; i--) {
            userTextArray.splice(elementsToRemove[i], 1);
        }
        var userTextArray_joined = userTextArray.join('\n');
        userTextArray_joined = userTextArray_joined.replace(/PLA.'CEHOLDER/g, '')
        console.log(userTextArray);
        return userTextArray_joined;
    }
    var lastTarget = null;

    function isFile(evt) {
        var dt = evt.dataTransfer;

        for (var i = 0; i < dt.types.length; i++) {
            if (dt.types[i] === "Files") {
                return true;
            }
        }
        return false;
    }

    window.addEventListener("dragenter", function (e) {
        if (isFile(e)) {
            lastTarget = e.target;
            document.getElementById('dropzone').style.visibility = "";
            document.getElementById('dropzone').style.opacity = 1;
        }
    });

    window.addEventListener("dragleave", function (e) {
        e.preventDefault();
        if (e.target === document || e.target === lastTarget) {
            document.getElementById('dropzone').style.visibility = "hidden";
            document.getElementById('dropzone').style.opacity = 0;
        }
    });

    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    window.addEventListener("drop", function (e) {
        e.preventDefault();
        document.getElementById('dropzone').style.visibility = "hidden";
        document.getElementById('dropzone').style.opacity = 0;
        if (e.dataTransfer.files.length == 1) {
            var fileName = (e.dataTransfer.files[0]) ? e.dataTransfer.files[0].name : "Click to select file (or drag and drop)";
            userPDF = e.dataTransfer.files[0];
            if (userPDF.type != "application/pdf") {
                console.error(userPDF.name, "is not a pdf file.")
                alert(userPDF.name + " is not a pdf file.");
                return;
            }

            $('#filename').text(fileName);

            console.log('The file "' + fileName + '" has been selected.');
            $('#loadingData').text('Splitters');
            $('#loadingBanner').show(100);
            firstChars = [];
            detectSplitters();
        }
    });
});
/* lastTarget is set first on dragenter, then
         compared with during dragleave. */

