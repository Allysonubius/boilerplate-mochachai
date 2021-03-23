const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function() {
    suite("Integration tests with chai-http", function() {
        // #1
        test("Test GET /hello with no name", function(done) {
            chai
                .request(server)
                .get("/hello")
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "hello Guest");
                    done();
                });
        });
        // #2
        test("Test GET /hello with your name", function(done) {
            chai
                .request(server)
                .get("/hello?name=Allyson")
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "hello Allyson");
                    done();
                });
        });
        // #3
        test('send {surname: "Colombo"}', function(done) {
            chai
                .request(server)
                .put("/travellers")
                .send({
                    surname: "Colombo"
                })
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'response status should be 200');
                    assert.equal(res.type, 'application/json', 'Response should be JSON');
                    assert.equal(
                        res.body.name,
                        'Cristoforo',
                        'res.body.name should be "Christoforo" '
                    );
                    assert.equal(
                        res.body.surname,
                        'Colombo',
                        'res.body.surname should be "Colombo" '
                    )
                    done();
                });
        });
        // #4
        test('send {surname: "da Verrazzano"}', function(done) {
            chai
                .request(server)
                .put('/travellers')
                .send({ surname: 'da Verrazzano' })
                /** place your tests inside the callback **/
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'response status should be 200');
                    assert.equal(res.type, 'application/json', 'Response should be json');
                    assert.equal(res.body.name, 'Giovanni');
                    assert.equal(res.body.surname, 'da Verrazzano');
                    done();
                });
        });
    });

    const Browser = require("zombie");

    suite("Functional Tests with Zombie.js", function() {

        suite('"Famous Italian Explorers" form', function() {
            // #5
            test('submit "surname" : "Colombo" - write your e2e test...', function(done) {
                browser.fill("surname", "Colombo").pressButton("submit", function() {
                    assert.fail();

                    done();
                });
            });
            // #6
            test('submit "surname" : "Vespucci" - write your e2e test...', function(done) {
                assert.fail();

                done();
            });
        });
    })
});