export const FILTER_TYPE:{[key:string]:string} ={
    all: 'all',
    scheduled:'scheduled',
    flag: 'flag',
    todo: 'todo',
}

export enum filterTypes {
    all='all',
    scheduled='scheduled',
    flag='flag',
    todo='todo',
}

export const  FILTER_INFO_MAP:{[key:string]:string} = {
    [filterTypes.all]: '所有待办事项历史',
    [filterTypes.scheduled]: '计划待办事项',
    [filterTypes.flag]: '一直想做却未做',
    [filterTypes.todo]:'今日的待办事项',
}

export interface todoItem {
    id:number;
    name: string;
    content: string;
    completed: boolean;
    createTime: string;
    scheduleTime: string;
    flag: boolean;
}