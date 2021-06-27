export enum ERole{
  COPY = 'Role.COPY',
  PASTE = 'Role.PASTE',
  CUT = 'Role.CUT',
  OPENFILE = 'Role.OPENFILE',
  OPENFOLDER = 'Role.OPENFOLDER'
}

export const Role = {

  copy: (options?: RoleOptions) => {
    console.log(options);
  },

  paste: (options?: RoleOptions) => {

  },

  cut: (options?: RoleOptions) => {

  },

  openFile: (options?: RoleOptions) => {

  },

  openFolder: (options?: RoleOptions) => {

  },

  closeWindow: (options?: RoleOptions) => {

  }

};

export interface RoleOptions{
  [x: string]: any;
}