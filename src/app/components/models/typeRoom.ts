export interface Room {
  id: number;
  name: string;
  description: string | null;
  parent: RoomParent | null;
  children: RoomChildren[]; // Change this to an array since it can have multiple children
  created_at?: string;
  updated_at?: string;
}

export interface RoomParent {
  id: number;
  parent_id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoomChildren {
  id: number;
  parent_id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface TypeRoom {
  data: Room[];
}
