

var minNum;
var maxNum;
var difNum;
function possibilities() {
  minNum = document.getElementById("fromNum").value;
  maxNum = document.getElementById("toNum").value;
  difNum = Math.abs(minNum - maxNum);
  document.getElementById("possibilities").innerHTML = "Possibilities: "+difNum;
  /*var node = document.getElementById("possibilities");  
  var textnode = document.createTextNode(z);       
  node.appendChild(textnode);                              
  document.getElementById("possibilities").appendChild(node);*/
}

/*function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

function getBase64() {
  toDataURL(
    (document.getElementById("foo").src,
    function(dataUrl) {
      document.getElementById("base64Text").innerHTML = dataUrl;
      console.log('RESULT:', dataUrl)
    }
  ))
}*/

function previewFile() {
  var file    = document.getElementById("foo").files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    document.getElementById("base64Text").innerHTML = reader.result.slice(23);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function testDuplicate () {
  var notDup = true;
  if (notDup) {
    document.getElementById("base64Text").style.display = "block";
    previewFile();
    showLoading();
  }
  else {
    document.getElementById("base64Text").innerHTML = "Duplicate image exists, please try another.";
    showLoading();
  }
}


function showLoading () {
  document.getElementById("loading").style.display = "block";
  document.getElementById("base64Text").style.display = "none";
  document.getElementById("base64Text2").style.display = "none";
  setTimeout (function () {
    document.getElementById("loading").style.display = "none";
    document.getElementById("base64Text").style.display = "block"; 
    document.getElementById("base64Text2").style.display = "block";
  }, 5000);
}

function retrieveRan() {
  var seed = document.getElementById("base64Text").innerHTML;
  //seed++
  Math.seedrandom(seed);
  var ranNum = difNum*Math.random();
  document.getElementById("retrieveRan").innerHTML = Math.trunc(ranNum);
  var w3w = getw3w(Math.random(), Math.random(), Math.random());
  document.getElementById("w3w1").innerHTML = w3w[0];
  document.getElementById("w3w2").innerHTML = w3w[1];
  document.getElementById("w3w3").innerHTML = w3w[2];
}

function generate3Desc() {
  document.getElementById("desc1").innerHTML = "BrokenWindshield, FlatTire, MotorcycleAccident, Vandalism";
  document.getElementById("desc2").innerHTML = "Person, Sitting, Lunch, EatingFood, OutDoors";
  document.getElementById("desc3").innerHTML = "Tree, PotPlant, Bonsai, Agrigulture, Gardening";
}

function checkDesc() {
  document.getElementById("right").style.display = "block";
  document.getElementById("retrieveRem").innerHTML = Math.trunc(1/Math.random()*(1/Math.random()));
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-env browser */

/**
 * Add detected object info as a row in the table.
 * @param {Object} table
 * @param {string} cellType
 * @param {[]} values
 */
function addRow(table, cellType, values) {
  const row = document.createElement('tr');
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    const cell = document.createElement(cellType);
    const text = document.createTextNode(val);
    cell.appendChild(text);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

/**
 * Create and populate a table to show the result details.
 * @param {[]} detectedObjects
 * @param {Object} parent
 */
function detectedObjectsTable(detectedObjects, parent) {
  if (detectedObjects.length > 0) {
    const table = document.createElement('table');

    addRow(table, 'th', ['Class', 'Confidence Score']);

    for (let i = 0; i < detectedObjects.length; i++) {
      const obj = detectedObjects[i];
      const label = obj['class'];
      const conf = obj['score'].toFixed(3);

      addRow(table, 'td', [label, conf]);
    }
    parent.appendChild(table);
  }
}

window.addEventListener('load', function() {
  const article = document.querySelector('article');

  /**
   * Populate the article with formatted results.
   * @param {Object} jsonResult
   */
  function populateArticle(jsonResult) {
    // Remove previous results
    article.innerHTML = '';

    if (jsonResult.hasOwnProperty('data')) {

      let classified = jsonResult.data.classes;
      const myCount = document.createElement('p');
      myCount.textContent = "Artificial Intelligence analysis:";
      article.appendChild(myCount);
      detectedObjectsTable(classified, article);
    } else {
      const myDiv = document.createElement('div');
      myDiv.className = 'error';
      myDiv.id = 'error-div';
      const myTitle = document.createElement('h3');
      myTitle.textContent = 'ERROR';
      myDiv.appendChild(myTitle);
      // Dump keys/values to show error info
      for (const key in jsonResult) {
        if (jsonResult.hasOwnProperty(key)) {
          const myP = document.createElement('p');
          myP.textContent = key + ':  ' + jsonResult[key];
          myDiv.appendChild(myP);
        }
      }
      article.appendChild(myDiv);
    }
  }

  
  // When upload results are loaded (hidden), use them build the results.
  const raw = top.frames['mytarget'];
  const myTarget = document.getElementById('mytarget');
  if (myTarget) { // optional for tests
    myTarget.addEventListener('load', function() {
      let rawContent = raw.document.body.innerText;
      console.log(rawContent);
      let rawJson = JSON.parse(rawContent);
      console.log(rawJson);
      populateArticle(rawJson);
    });
  }

  // image preview
  document.getElementById("foo").addEventListener("change", imagePreview);
  function imagePreview() {
    let input = document.querySelector('input[type=file]');
    if (input.files && input.files[0]) {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = fileReader.result;
        imagePreview.style = "display: block; max-height: 200px; max-width: 400px";
      };

      fileReader.readAsDataURL(input.files[0]);
    }
  }
});
