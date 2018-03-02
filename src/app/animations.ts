import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

export const slideInOutAnimation = [
  trigger('slideInOut',[
    state('in',style({
      'visibility':'visible',
      'max-height':'1000px',
      'opacity':'1',
      'box-shadow': '6px 11px 48px -2px rgba(0,0,0,0.58)'
    })),
    state('out',style({
      'max-height':'0px',
      'opacity':'0',
      'visibility':'hidden'})),
    transition('in=>out',[group([
      animate('100ms ease-in-out',style({
        'opacity':'0'
      })),
      animate('100ms ease-in-out',style({
        'max-height':'0px'
      })),
      animate('100ms ease-in-out',style({
        'visibility':'hidden'
      }))
    ])]),
     transition('out=>in',[group([

      animate('800ms',style({
        'visibility':'visible',
        'max-height':'1000px',
        'box-shadow': '6px 11px 48px -2px rgba(0,0,0,0.58)'
      })),
       animate('450ms',style({
         'opacity':'1',
         })),
       animate('800ms',keyframes([
         style({
           paddingBottom : '0px',
           offset : 0
         }),
         style({
           paddingBottom : '10px',
           offset : 0.5
          }),
         style({
           paddingBottom : '0px',
           offset : 1
         })
       ])),
       animate('800ms',keyframes([
         style({
           paddingTop:'0px',
           offset : 0
         }),
         style({
           paddingTop:'10px',
           offset : 0.5
         }),
         style({
           paddingTop:'0px',
           offset : 1
         })
       ]))

    ])])
  ])


]
