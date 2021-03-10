class Carousel {
  constructor (element) {
    this.playdate = element;

    // add first two swipecards programmatically
    // this.push()
    // this.push()

    // handle gestures
    this.handle();
  }

  handle () {
    // list all swipecards
    this.swipecards = this.playdate.querySelectorAll('.swipecard');

    // get top swipecard
    this.topSwipecard = this.swipecards[this.swipecards.length - 1];

    // get next swipecard
    this.nextSwipecard = this.swipecards[this.swipecards.length - 2];

    // if at least one swipecard is present
    if (this.swipecards.length > 0) {
      // set default top swipecard position and scale
      // this.topSswipecard.style.transform =
      // 'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'

      // destroy previous Hammer instance, if present
      if (this.hammer) this.hammer.destroy();

      // listen for tap and pan gestures on top swipecard
      this.hammer = new Hammer(this.topSwipecard);
      this.hammer.add(new Hammer.Tap());
      this.hammer.add(new Hammer.Pan({
        position: Hammer.position_ALL,
        threshold: 0
      }));

      // pass events data to custom callbacks
      this.hammer.on('tap', (e) => {
        this.onTap(e);
      });
      this.hammer.on('pan', (e) => {
        this.onPan(e);
      });
    }
  }

  onTap (e) {
    // get finger position on top swipecard
    const propX = (e.center.x - e.target.getBoundingClientRect().left) / e.target.clientWidth;

    // get rotation degrees around Y axis (+/- 15) based on finger position
    const rotateY = 15 * (propX < 0.05 ? -1 : 1);

    // enable transform transition
    this.topSwipecard.style.transition = 'transform 100ms ease-out';

    // apply rotation around Y axis
    this.topSwipecard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(' + rotateY + 'deg) scale(1)';

    // wait for transition end
    setTimeout(() => {
      // reset transform properties
      this.topSwipecard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)';
    }, 100);
  }

  onPan (e) {
    if (!this.isPanning) {
      this.isPanning = true;

      // remove transition properties
      this.topSwipecard.style.transition = null;
      if (this.nextSwipecard) this.nextSwipecard.style.transition = null;

      // get top swipecard coordinates in pixels
      const style = window.getComputedStyle(this.topSwipecard);
      const mx = style.transform.match(/^matrix\((.+)\)$/);
      this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
      this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;

      // get top swipecard bounds
      const bounds = this.topSwipecard.getBoundingClientRect();

      // get finger position on top swipecard, top (1) or bottom (-1)
      this.isDraggingFrom =
                (e.center.y - bounds.top) > this.topSwipecard.clientHeight / 2 ? -1 : 1;
    }

    // get new coordinates
    let posX = e.deltaX + this.startPosX;
    let posY = e.deltaY + this.startPosY;

    // get ratio between swiped pixels and the axes
    const propX = e.deltaX / this.playdate.clientWidth;
    const propY = e.deltaY / this.playdate.clientHeight;

    // get swipe direction, left (-1) or right (1)
    const dirX = e.deltaX < 0 ? -1 : 1;

    // get degrees of rotation, between 0 and +/- 45
    const deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

    // get scale ratio, between .95 and 1
    const scale = (95 + (5 * Math.abs(propX))) / 100;

    // move and rotate top swipecard
    this.topSwipecard.style.transform =
            'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)';

    // scale up next swipecard
    if (this.nextSwipecard) {
      this.nextSwipecard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')';
    }

    if (e.isFinal) {
      this.isPanning = false;

      let successful = false;

      // set back transition properties
      this.topSwipecard.style.transition = 'transform 200ms ease-out';
      if (this.nextSwipecard) this.nextSwipecard.style.transition = 'transform 100ms linear';

      // check threshold and movement direction
      if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
        successful = true;
        // get right border position
        posX = this.playdate.clientWidth;
      } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
        successful = true;
        // get left border position
        posX = -(this.playdate.clientWidth + this.topSwipecard.clientWidth);
      } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {
        successful = true;
        // get top border position
        posY = -(this.playdate.clientHeight + this.topSwipecard.clientHeight);
      }

      if (successful) {
      console.log(dirX);
      // if 

    }
      //   // throw swipecard in the chosen direction
      //   this.topSwipecard.style.transform =
      //               'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)';

      //   // wait transition end
      //   setTimeout(() => {
      //     // remove swiped swipecard
      //     this.playdate.removeChild(this.topSwipecard);
      //     // add new swipecard
      //     this.push();
      //     // handle gestures on new top swipecard
      //     this.handle();
      //   }, 200);
      // } else {
      //   // reset swipecards position and size
      //   this.topSwipecard.style.transform =
      //               'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)';
      //   if (this.nextSwipecard) {
      //     this.nextSwipecard.style.transform =
      //               'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)';
      //   }
      // }
    }
  }

  push () {
    const swipecard = document.createElement('div');

    swipecard.classList.add('swipecard');

    swipecard.style.backgroundImage =
            "url('https://picsum.photos/320/320/?random=" + Math.round(Math.random() * 1000000) + "')";

    this.playdate.insertBefore(swipecard, this.playdate.firstChild);
  }
};

const playdate = document.querySelector('.js-playdate-card-wrapper');

const carousel = new Carousel(playdate);
