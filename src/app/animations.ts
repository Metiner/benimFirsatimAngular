import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";
import {AnimationTrigger} from "@angular/animations/browser/src/dsl/animation_trigger";

export const slideInOutAnimation = [
  trigger('slideInOut',[
    state('in',style({
      opacity:1,
      transform:'translateY(0)',
      'box-shadow': '6px 11px 48px -2px rgba(0,0,0,0.58)',
      visibility:'visible'

    })),
    state('out',style({
      opacity:0,
      transform:'translateY(0)',
      'box-shadow': '6px 11px 48px -2px rgba(0,0,0,0.58)',
      visibility:'hidden'
    })),
    transition('in=>out',[group([
      animate('700ms ease-out',keyframes([
        style({
          opacity:1,
          offset:0,
          transform:'translateY(0)'
        }),
        style({
          opacity:0,
          offset:0.4,
          transform:'translateY(-2%)',
        }),
        style({
          opacity:0,
          offset:1,
          transform:'translateY(2%)'
        })
      ]))
    ])]),
     transition('out=>in',[group([

       animate('700ms ease-out',keyframes([
         style({
           opacity:0,
           offset:0,
           transform:'translateY(2%)',
           visibility:'hidden'
         }),
         style({
           opacity:0,
           offset:0.4,
           transform:'translateY(-2%)',
         }),
         style({
           opacity:1,
           offset:1,
           transform:'translateY(0)',
           visibility:'visible'
         })
       ]))
     ])
    ])])

];

export const dealStateTrigger = trigger('dealState',[
  transition(':enter',[
    animate('300ms',keyframes([
      style({
        opacity:0,
        offset:0,
        transform:'translateY(20%)'
      }),
      style({
        opacity:0,
        offset:0.4,
        transform:'translateY(-10%)',
      }),
      style({
        opacity:1,
        offset:1,
        transform:'translateY(0)'
      })
    ]))
  ])
]);

export const commentStateTrigger = trigger('commentState',[
  transition(':enter',[
    animate('1000ms',keyframes([
      style({
        opacity:0,
        offset:0,
        transform:'translateY(20%)'
      }),
      style({
        opacity:0,
        offset:0.5,
        transform:'translateY(-10%)',
      }),
      style({
        offset:0.6,
        transform:'scale(1.1)',

      }),

      style({
        opacity:1,
        offset:1,
        transform:'translateY(0)',

      })
    ]))
  ])
]);


export const showMeTrigger = trigger('showMe',[
  state('show',style({
    transform:'scale(1.2)'
  })),
  state('notShow',style({
    transform:'scale(1.0)'
  })),
  transition('*<=>*',[
    animate(500)
  ])
]);

export const dealAvatarSelectionTrigger = trigger('selectMe',[
  state('selected',style({
    opacity : 1
  })),
  state('unSelected',style({
    opacity : 0.50
  })),
  transition('*<=>*',[
    animate(500)
  ])
]);

export const loadingBlackDivAnimationTrigger = trigger('loadingBlackDiv', [
  transition(':enter', [   // :enter is alias to 'void => *'
    style({
      opacity:0
    }),
    animate('600ms ease-in-out', style({opacity:1}))
  ]),
  transition(':leave', [   // :leave is alias to '* => void'
    animate('600ms ease-in-out', style({opacity:0}))
  ])
]);


export const tutorialPopupAnimTrigger = trigger('tutorialPopup', [
  transition(':enter',[
    style({
      opacity:0,
      top:'47%',
      visibility:'hidden'
    }),
    animate(300,
      style({
        opacity:1,
        top:'50%',
        visibility:'visible'
      }))
  ]),

  transition(':leave',[
    style({
      opacity:1,
      visibility:'visible'
    }),
    animate(500,
      style({
        opacity:0,
        visibility:'hidden'
      }))
  ])
]);


export const signupSigninPopupAnimTrigger = trigger('singinSignupPopup', [
  transition(':enter',[

    style({
      opacity:0,
      left:'40%'
    }),
    animate('500ms cubic-bezier(.57,.48,0,.98)',
      style({
        opacity:1,
        left:'64%'
      }))
  ]),

  transition(':leave',[
    style({
      visibility:'hidden'
    })
  ])
]);

export const kayitOlAnimTrigger = trigger('kayitOl',[
  state('up',style({

    transform:'scale(1.0)'
  })),
  state('down',style({
    transform:'scale(0.7)'
  })),
  transition('down <=> up',
    animate('1000ms ease-in-out')),
  transition(':enter',[
    style({
    opacity:0
  }),
    animate('300ms ease-in-out',

      style({
        opacity:1
      }))
  ])
])


export const girisYapAnimTrigger = trigger('girisYap',[
  state('up',style({
    marginTop:'0px',
    transform:'scale(1.0)'
  })),
  state('down',style({
    top:'68%',
    transform:'scale(0.5)'
  })),
  transition('down <=> up',
    animate('1000ms ease-in-out'))
])

export const kayitSuccessTrigger = trigger('kayitSuccess',[
  transition(':enter',[
    animate('1000ms ease-in-out',keyframes([
      style({
        opacity:0,
        offset:0,
        transform:'scale(0)',
        textAlign: 'text-center'
      }),
      style({
        opacity:1,
        offset:0.8,
        transform:'scale(1.3)'
      }),
      style({
        opacity:1,
        offset:1,
        transform:'scale(1)'
      })
    ]))
  ])
]);
export const highlightTrigger = trigger('highlight',[
  state('highlighted',
    style(
      {
        color:'red'
      }
  )),
  transition('* <=> highlighted',[
    animate(250)
  ])
])

export const tabActivationTrigger = trigger('tabActivation',[
  state('active',
    style(
      {
      'font-family': 'Mark Pro-Black',
      }
    )),
    transition('*<=> active',[
      animate(0)
      ])
])
