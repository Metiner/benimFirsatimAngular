import {animate, group, state, style, transition, trigger} from "@angular/animations";

export const slideInOutAnimation = [
  trigger('slideInOut',[
    state('in',style({
      'max-height':'2000px',
      'visibility':'visible',
      'opacity':'1'
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

      animate('400ms ease-in-out',style({
        'visibility':'visible'
      })),
      animate('400ms ease-in-out',style({
        'max-height':'500px'
      })),
      animate('400ms ease-in-out',style({
        'opacity':'1'
      }))
    ])])
  ])


]
