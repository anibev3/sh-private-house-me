export class Endpoint {
  public static BOOKING_DETAILS: string = 'bookings';
  public static CANCELLED: string = 'bookings/to-cancel';
  public static CITIES: string = '/cities';
  public static TYPE_ROOM: string = '/type-room';
  public static ALL_ROOM: string = '/rooms';
  public static REGISTER: string = 'auth/register';
  public static LOGIN: string = 'auth/login';
  public static USER_INFO: string = 'auth/user';
  public static UPDATE_USER_INFO: string = 'profile/update';
  public static UPDATE_USER_PASSWORD: string = 'profile/password/change';
  public static TOP_ROOMS: string = '/get-top-rooms';
  public static COUNTRIES: string = '/countries';
  public static SING_ROOM: string = 'rooms';
  public static REVIEW: string = 'rooms/reviews';
}
