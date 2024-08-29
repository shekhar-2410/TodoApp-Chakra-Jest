import React, { useState } from "react";
import { Box, Text, Input, HStack, Button, Spacer } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";


const Todo = () => {
  const [chnageText, setChnageText] = useState("");
  const [data, setData] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);
  const chnage = (e) => {
    setChnageText(e.target.value);
  };
  const add = () => {
    setData((prev) => [...prev, chnageText]);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Todo",
        body: [...data, chnageText],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
    setChnageText("");
  };

  const deletItem = (index) => {
    const newData = data?.filter((item, i) => i !== index);
    setData(newData);
  };

  const edit = (id) => {
    let newValue =  window.prompt(`Enter New Value ${data[id]}`);
    if (newValue) {
      const newData = data?.map((item, i) => (i === id ? newValue : item));
      setData(newData);
    }
  };
  const changDone = (id) => {
    setDoneTodo((prev) =>
      prev.includes(id)
        ? prev?.filter((item, index) => index !== id)
        : [...prev, id]
    );
  };

  return (
    <Box data-testid="todo">
      <Text fontSize={"6xl"} textAlign={"center"} color={"gray.600"}>
        TodoList
      </Text>
      <Box width={"50%"} mx={"auto"}>
        <Box>
          <Input
            borderTop={"0px"}
            borderLeft={"0px"}
            borderRight={"0px"}
            borderBottom={"2px solid gray"}
            placeholder={"Enter Todo"}
            width={"2xl"}
            mt={"10px"}
            onChange={chnage}
            value={chnageText}
          />
        </Box>
        <HStack mt={"10px"}>
          {chnageText.length === 0 ? (
            <Button
              isLoading
              loadingText="Adding Todo"
              colorScheme="orange"
              variant="outline"
            >
              Add Todo
            </Button>
          ) : (
            <Button onClick={add} colorScheme="orange">
              Add Todo
            </Button>
          )}
        </HStack>
        {data?.map((item, index) => (
          <Box
            width={"2xl"}
            mt={"10px"}
            key={index}
            background={"gray.600"}
            p={"10px"}
            borderRadius={"10px"}
            boxShadow={"md"}
          >
            <HStack>
              {doneTodo.includes(index) ? (
                <Text
                  as="s"
                  color={"#fff"}
                  textTransform={"capitalize"}
                  fontSize={"2xl"}
                  onClick={() => changDone(index)}
                  cursor={"pointer"}
                >
                  {item}
                </Text>
              ) : (
                <Text
                  onClick={() => changDone(index)}
                  color={"#fff"}
                  textTransform={"capitalize"}
                  fontSize={"2xl"}
                  cursor={"pointer"}
                >
                  {item}
                </Text>
              )}

              <Spacer />
              <Button
                onClick={() => edit(index)}
                colorScheme="green"
                rightIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  deletItem(index);
                }}
                colorScheme="red"
                rightIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Todo;
