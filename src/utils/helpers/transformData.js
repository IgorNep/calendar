export default class TransformData {
  static transformDataToMeeting(dataFromDataBase) {
    const meetings = [];
    if (dataFromDataBase && dataFromDataBase !== null) {
      dataFromDataBase.forEach((item) => {
        if (item.data.trim() !== '') {
          const { id } = item;
          const meeting = JSON.parse(item.data);
          meeting.id = id;
          meetings.push(meeting);
        }
      });
    }

    return meetings;
  }

  static transformSingleItemToMeeting(formData) {
    const { id } = formData;
    const meeting = JSON.parse(formData.data);
    meeting.id = id;
    return meeting;
  }
}
