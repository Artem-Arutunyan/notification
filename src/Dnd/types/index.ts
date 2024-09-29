export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export interface ITask {
  id: Id;
  columnId: Id;
  content: string;
}
