
/*describe('Protractor', function () {
    it('Should be alive', function () {
        browser.url('/')
        console.log('--Test passed!')
    })
})*/

describe('WDIO', function() {
    it('Searching elements', function() {
        browser.url('/about-us-i-1');
        let body = $('body');

        console.log(body.getText());

        let paragraphs = $$('p');

        paragraphs.forEach(function(p){
            console.log(p.getText());
        })
    })
})