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

export const roleHandler = (role: ERole, options?: RoleOptions) => {
  switch(role){
    case ERole.COPY:
      return Role.copy(options);
    case ERole.PASTE:
      return Role.paste(options);
    case ERole.CUT:
      return Role.cut(options);
    case ERole.OPENFILE:
      return Role.openFile(options);
    case ERole.OPENFOLDER:
      return Role.openFolder(options);
    default: throw new Error('Role undefined');
  }
};

export interface RoleOptions{
  [x: string]: any;
}