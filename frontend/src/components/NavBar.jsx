import { Button, Container, Flex, HStack, Text, useColorMode} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { CiDark } from "react-icons/ci";


const NavBar = () => {
    const {colorMode, toggleColorMode} = useColorMode();



    return (
        <Container maxW={"1140px"} px={"4"} >
            <Flex 
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}   
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                     bgGradient={"linear(to-r, cyan.400, blue.500)"}
                     bgClip='text'
                     fontSize={{base: "22" , sm: "28"}}
                     fontWeight='bold'
                     textAlign={'center'}
                     textTransform={"uppercase"}
                >
                    <Link to={"/"}>Sellify 🛒 </Link>

                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"} >
                        <Button>
                            <FaCartPlus size={25} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <CiDark size={25} /> :<FiSun size={25}/>}
                    </Button>

                </HStack>
            </Flex>
        </Container>
    )
}

export default NavBar