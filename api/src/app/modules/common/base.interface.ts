
export interface BaseRepositoryMethods{
    create(data: any): Promise<any>;
    find(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    update(data: any): Promise<any>;
}

export interface BaseServiceMethods{}
