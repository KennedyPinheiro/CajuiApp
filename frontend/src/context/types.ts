export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Disciplina: undefined;
};

export type AtividadeType = {
  id: number;
  disciplina_id:number
  titulo: string;
  nota:number
  max_pontos: number;
};

export type NotaType = {
  atividade_id: number;
  nota: number;
};

