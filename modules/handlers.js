exports.upload = function (request, response) {
    console.log('Rozpoczynam obsługę żądania upload.');
    response.write('Rozpoczynam upload!');
    response.end();
}

exports.welcome = function (request, response) {
    console.log('Rozpoczynam obsługę żądania welcome.');
    response.write('Witaj na stronie startowej!');
    response.end();
}

exports.error = function (request, response) {
    console.log('Nie wiem co robić.');
    response.write('404 :(');
    response.end();
}