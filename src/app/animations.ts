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

]

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
])

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
])


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
])

export const dealAvatarSelectionTrigger = trigger('selectMe',[
  state('selected',style({
    border:'3px solid #234491',
    borderRadius:'30px',
    borderStyle:'inset'
  })),
  state('unSelected',style({
    borderRadius:'15px'
  })),
  transition('*<=>*',[
    animate(500)
  ])
])

export const loadingBlackDivAnimationTrigger = trigger('loadingBlackDiv', [
  transition(':enter', [   // :enter is alias to 'void => *'

    animate(200, style({opacity:1}))
  ]),
  transition(':leave', [   // :leave is alias to '* => void'
    animate(200, style({opacity:0}))
  ])
])

