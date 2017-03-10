"use strict";
var testing_1 = require('@angular/core/testing');
var notfound_component_1 = require('./notfound.component');
describe('NotFoundComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [notfound_component_1.NotFoundComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(notfound_component_1.NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
