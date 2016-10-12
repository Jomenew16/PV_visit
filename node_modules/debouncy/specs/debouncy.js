describe( 'debouncy', function () {
  beforeEach( function () {
    var me = this;
    me.clock = me.sandbox.useFakeTimers();
  } );

  afterEach( function () {
    var me = this;
    me.clock.restore();
  } );

  it( 'should execute a function as soon as the time between to the last call to it is equal to the provided delay', function () {
    var me = this;

    var spyFn = this.sandbox.spy();

    var debouncy = require( '../index' );

    var delayedFn = debouncy( spyFn, 100 );

    delayedFn( 1 );
    expect( spyFn.callCount ).to.equal( 0 );

    me.clock.tick( 50 );

    expect( spyFn.callCount ).to.equal( 0 );

    delayedFn( 2 );
    me.clock.tick( 50 );

    expect( spyFn.callCount ).to.equal( 0 );

    delayedFn( 3 );
    me.clock.tick( 100 );

    expect( spyFn.callCount ).to.equal( 1 );
    expect( spyFn ).to.have.been.calledWith( 3 );

  } );

  it( 'should not call the function if cancel is called on the debounced function', function () {
    var me = this;

    var spyFn = this.sandbox.spy();

    var debouncy = require( '../index' );

    var delayedFn = debouncy( spyFn, 100 );

    delayedFn();
    expect( spyFn.callCount ).to.equal( 0 );

    me.clock.tick( 50 );

    expect( spyFn.callCount ).to.equal( 0 );

    delayedFn();

    me.clock.tick( 50 );

    expect( spyFn.callCount ).to.equal( 0 );

    delayedFn();
    me.clock.tick( 50 );
    delayedFn.cancel();

    me.clock.tick( 100 );

    expect( spyFn.callCount ).to.equal( 0 );

  } );


  it( 'should execute a function on the leading edge of the sequence of calls', function () {
    var me = this;

    var spyFn = this.sandbox.spy();


    var debouncy = require( '../index' );

    var delayedFn = debouncy( spyFn, 100, null, true );

    delayedFn();
    expect( spyFn.callCount ).to.equal( 1 );

    me.clock.tick( 50 );

    delayedFn();
    me.clock.tick( 50 );

    expect( spyFn.callCount ).to.equal( 1 );
    me.clock.tick( 50 );

    delayedFn();
    me.clock.tick( 100 );

    expect( spyFn.callCount ).to.equal( 2 );

  } );
} );
