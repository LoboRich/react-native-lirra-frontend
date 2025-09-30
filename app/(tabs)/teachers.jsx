import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import styles from "../../assets/styles/teachers.styles";
import TeachersListview from "../../components/TeachersListview";
import { useAuthStore } from "../../store/authStore";
import { ActivityIndicator } from "react-native-paper";
import { API_URL } from "../../constants/api";
const teacherImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=loborich"
// sample data
const itemList = [
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
  const { token } = useAuthStore();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("contributors");
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [value]);

  
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <TeachersListview itemList={teachers} value={value} setValue={setValue} token={token}/>
    </View>
  );
};

export default Teachers;
