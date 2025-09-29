import React from "react";
import { Dimensions, View } from "react-native";
import styles from "../../assets/styles/teachers.styles";
import TeachersListview from "../../components/TeachersListview";
const teacherImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=loborich"
// sample data
const teachers = [
  {
    id: "1",
    name: "Prof. Alice Johnson",
    joined: "2023-05-12",
    department: "Mathematics",
    image: "https://api.dicebear.com/7.x/avataaars/png?seed=alice",
  },
  {
    id: "2",
    name: "Dr. Bob Smith",
    joined: "2022-11-03",
    department: "Computer Science",
    image: "https://api.dicebear.com/7.x/avataaars/png?seed=bob",
  },
  {
    id: "3",
    name: "Ms. Carol Lee",
    joined: "2021-09-15",
    department: "Physics",
    image: "https://api.dicebear.com/7.x/avataaars/png?seed=carol",
  },
  {
    id: "4",
    name: "Ms. Jufran Doe",
    joined: "2021-09-15",
    department: "Physics",
    image: "https://api.dicebear.com/7.x/avataaars/png?seed=john",
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
