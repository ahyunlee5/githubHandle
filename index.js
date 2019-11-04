'use strict';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key} = ${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.message; i++) {
    console.log('display result');
    $('#results-list').append(
      `<p><a href="${url} target="_blank"">${repo_name}</a></p>`
    );
    $('#results').removeClass('hidden');
  }
}

function getRepos(userInput) {
  fetch(`https://api.github.com/users/${userInput}/repos`)
    .then(response => {
      if (response.ok) {
        console.log('repsonse okay');
        return response.json();
      }
      throw new Error (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}


function watchForm () {
  $('form').on('submit', function() {
    event.preventDefault();
    let userInput = $('#js-search-term').val();
    $('#results').empty();
    getRepos();
  });
}
$(function() {
  console.log('App loaded. Waiting for user input');
  watchForm();
})