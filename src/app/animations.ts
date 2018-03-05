import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";
import {AnimationTrigger} from "@angular/animations/browser/src/dsl/animation_trigger";

export const slideInOutAnimation = [
  trigger('slideInOut',[
    state('in',style({
      opacity:1,
      transform:'translateY(0)',
      'box-shadow': '6px 11px 48px -2px rgba(0,0,0,0.58)'
    })),
    state('out',style({
      opacity:0,
      transform:'translateY(0)',
      'box-shadow': '6px 11px 48px -2px rgba(0,0,0,0.58)'
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
           transform:'translateY(2%)'
         }),
         style({
           opacity:0,
           offset:0.4,
           transform:'translateY(-2%)',
         }),
         style({
           opacity:1,
           offset:1,
           transform:'translateY(0)'
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


