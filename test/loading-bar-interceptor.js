var isLoadingBarInjected;

isLoadingBarInjected = function(doc) {
  var divs, i, injected, _i, _len;
  injected = false;
  divs = angular.element(doc).find('div');
  for (_i = 0, _len = divs.length; _i < _len; _i++) {
    i = divs[_i];
    if (angular.element(i).attr('id') === 'loading-bar') {
      injected = true;
      break;
    }
  }
  return injected;
};

describe('loadingBarInterceptor Service', function() {
  var $document, $http, $httpBackend, $timeout, endpoint, loadingBar, response, result;
  $http = $httpBackend = $document = $timeout = result = loadingBar = null;
  response = {
    message: 'OK'
  };
  endpoint = '/service';
  beforeEach(function() {
    module('chieffancypants.loadingBar', function(cfpLoadingBarProvider) {
      loadingBar = cfpLoadingBarProvider;
    });
    result = null;
    return inject(function(_$http_, _$httpBackend_, _$document_, _$timeout_) {
      $http = _$http_;
      $httpBackend = _$httpBackend_;
      $document = _$document_;
      return $timeout = _$timeout_;
    });
  });
  beforeEach(function() {
    return this.addMatchers({
      toBeBetween: function(high, low) {
        var temp;
        if (low > high) {
          temp = low;
          low = high;
          high = temp;
        }
        return this.actual > low && this.actual < high;
      }
    });
  });
  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    return $timeout.verifyNoPendingTasks();
  });
  it('should increment the loading bar when not all requests have been recieved', inject(function(cfpLoadingBar) {
    $httpBackend.expectGET(endpoint).respond(response);
    $httpBackend.expectGET(endpoint).respond(response);
    $http.get(endpoint).then(function(data) {
      return result = data;
    });
    $http.get(endpoint).then(function(data) {
      return result = data;
    });
    expect(cfpLoadingBar.status()).toBe(0);
    $httpBackend.flush(1);
    expect(cfpLoadingBar.status()).toBe(0.5);
    $httpBackend.flush();
    expect(cfpLoadingBar.status()).toBe(1);
    $httpBackend.verifyNoOutstandingRequest();
    return $timeout.flush();
  }));
  it('should count http errors as responses so the loading bar can complete', inject(function(cfpLoadingBar) {
    $httpBackend.expectGET(endpoint).respond(401);
    $httpBackend.expectGET(endpoint).respond(401);
    $http.get(endpoint);
    $http.get(endpoint);
    expect(cfpLoadingBar.status()).toBe(0);
    $httpBackend.flush(1);
    expect(cfpLoadingBar.status()).toBe(0.5);
    $httpBackend.flush();
    expect(cfpLoadingBar.status()).toBe(1);
    $httpBackend.verifyNoOutstandingRequest();
    return $timeout.flush();
  }));
  it('should insert the loadingbar into the DOM when a request is sent', function() {
    var divs, injected;
    $httpBackend.expectGET(endpoint).respond(response);
    $httpBackend.expectGET(endpoint).respond(response);
    $http.get(endpoint);
    $http.get(endpoint);
    $httpBackend.flush(1);
    divs = angular.element($document[0].body).find('div');
    injected = isLoadingBarInjected($document[0].body);
    expect(injected).toBe(true);
    $httpBackend.flush();
    return $timeout.flush();
  });
  it('should remove the loading bar when all requests have been received', function() {
    $httpBackend.expectGET(endpoint).respond(response);
    $httpBackend.expectGET(endpoint).respond(response);
    $http.get(endpoint);
    $http.get(endpoint);
    $timeout.flush();
    expect(isLoadingBarInjected($document[0].body)).toBe(true);
    $httpBackend.flush();
    $timeout.flush();
    return expect(isLoadingBarInjected($document[0].body)).toBe(false);
  });
  it('should get and set status', inject(function(cfpLoadingBar) {
    cfpLoadingBar.start();
    $timeout.flush();
    cfpLoadingBar.set(0.4);
    expect(cfpLoadingBar.status()).toBe(0.4);
    cfpLoadingBar.set(0.9);
    expect(cfpLoadingBar.status()).toBe(0.9);
    cfpLoadingBar.complete();
    return $timeout.flush();
  }));
  it('should increment things randomly', inject(function(cfpLoadingBar) {
    var lbar, width, width2;
    cfpLoadingBar.start();
    $timeout.flush();
    cfpLoadingBar.set(0.1);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBeBetween(3, 6);
    cfpLoadingBar.set(0.2);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBeBetween(3, 6);
    cfpLoadingBar.set(0.25);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBeBetween(0, 3);
    cfpLoadingBar.set(0.5);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBeBetween(0, 3);
    cfpLoadingBar.set(0.65);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBeBetween(0, 2);
    cfpLoadingBar.set(0.75);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBeBetween(0, 2);
    cfpLoadingBar.set(0.9);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBe(0.5);
    cfpLoadingBar.set(0.95);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBeGreaterThan(width);
    expect(width2 - width).toBe(0.5);
    cfpLoadingBar.set(0.97);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBe(width);
    cfpLoadingBar.set(0.99);
    lbar = angular.element(document.getElementById('loading-bar'));
    width = lbar.children().css('width').slice(0, -1);
    $timeout.flush();
    width2 = lbar.children().css('width').slice(0, -1);
    expect(width2).toBe(width);
    cfpLoadingBar.complete();
    return $timeout.flush();
  }));
  it('should not set the status if the loading bar has not yet been started', inject(function(cfpLoadingBar) {
    cfpLoadingBar.set(0.5);
    expect(cfpLoadingBar.status()).toBe(0);
    cfpLoadingBar.set(0.3);
    expect(cfpLoadingBar.status()).toBe(0);
    cfpLoadingBar.start();
    cfpLoadingBar.set(0.3);
    expect(cfpLoadingBar.status()).toBe(0.3);
    cfpLoadingBar.complete();
    return $timeout.flush();
  }));
  return it('should hide the spinner if configured', inject(function(cfpLoadingBar) {
    var spinner;
    cfpLoadingBar.start();
    spinner = document.getElementById('loading-bar-spinner');
    expect(spinner).not.toBeNull();
    cfpLoadingBar.complete();
    $timeout.flush();
    cfpLoadingBar.includeSpinner = false;
    cfpLoadingBar.start();
    spinner = document.getElementById('loading-bar-spinner');
    expect(spinner).toBeNull;
    cfpLoadingBar.complete();
    return $timeout.flush();
  }));
});
