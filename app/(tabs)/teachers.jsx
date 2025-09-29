import React from "react";
import { Dimensions, View } from "react-native";
import styles from "../../assets/styles/teachers.styles";
import TeachersListview from "../../components/TeachersListview";
const teacherImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=loborich"
// sample data
const teachers = [
    {
      id: "1",
      fullname: "Prof. Alice Johnson",
      image_url: teacherImage,
      date_joined: "2021-08-12",
    },
    {
      id: "2",
      fullname: "Dr. Bob Smith",
      image_url: teacherImage,
      date_joined: "2020-05-03",
    },
    {
      id: "3",
      fullname: "Ms. Carol Lee",
      image_url: teacherImage,
      date_joined: "2022-01-25",
    },
    {
      id: "4",
      fullname: "Mr. Daniel Cruz",
      image_url: teacherImage,
      date_joined: "2019-11-10",
    },{
      id: "5",
      fullname: "Prof. Alice Johnson",
      image_url: teacherImage,
      date_joined: "2021-08-12",
    },
    {
      id: "6",
      fullname: "Dr. Bob Smith",
      image_url: teacherImage,
      date_joined: "2020-05-03",
    },
    {
      id: "7",
      fullname: "Ms. Carol Lee",
      image_url: teacherImage,
      date_joined: "2022-01-25",
    },
    {
      id: "8",
      fullname: "Mr. Daniel Cruz",
      image_url: teacherImage,
      date_joined: "2019-11-10",
    },
  ];
  

const Teachers = () => {
  return (
    <View style={styles.container}>
      <TeachersListview itemList={teachers} />
    </View>
  );
};

export default Teachers;
