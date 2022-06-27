// Rxjs playground - https://out.stegrider.vercel.app/

const { fromEvent } = Rx;
const { map, pluck, tap, share } = RxOperators;

const input = document.createElement('input');
const container = document.querySelector('.container');
container.appendChild(input);

//example 1
// fromEvent is an operator which returns an observable
const observable = fromEvent(input, 'input')
							.pipe(
                pluck('target', 'value'),
                map(value => parseInt(value)),
                map(val => {
                  console.log(isNaN(val));
                	if (isNaN(val)) {
                  	throw new Error('Enter number');
                  }
                  return val;
                })
               )


// whatever we pass to subscribe is the actual 'observer'
observable.subscribe({
	next(val) {
    console.log('your val - ', val);
  },
  error(er) {
    console.error(er.message);
  }
});

// this is specific to this tool, 
// we dont need to write this in the real world
observable;


//example 2 unicast observable
const observable1 = new Observable((subscriber) => {
    //can pass anything to it
    //throw the value passed into our pipeline
      subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    
    //anytime we want to stop our observable from emitting anything else
    //marks this observable as complete, no more values will come out
    subscriber.complete();
    
    //emit an error, no more values will come out
    subscriber.error(new Error('error'));
  }).pipe(
    tap(value => console.log('from tap ', value)),
    //share() makes multicast observable
    share()
    );
  //not necessary is to always add on a pipeline to an observable
  
  observable1.subscribe(
   /** {
      next(val) {
      console.log('value - ', val);
    },
    
    complete() {
      console.log('Observable is complete');
    },
    
    error(err) {
      console.error(err.message);
    }
  }**/
   (value) => console.log('Next value ', value),
    (err) => console.error(err.message),
    () => console.log('done')
  );
  
  observable1.subscribe((val) => {
      console.log('from second subscribe', val);
  });
  
  //only coz of the rx js dev playground
  
  new Observable(() => {});


//example 3

