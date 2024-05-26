public class Main {
    public static void main(String[] args) {
        // Crear instancias de las clases necesarias
        Autenticacion auth = new Autenticacion();

        // Registro de usuario
        Usuario nuevoUsuario = new Usuario("user1", "password1", "email1@example.com");
        boolean registroExitoso = auth.registrarUsuario(nuevoUsuario);
        System.out.println("Registro de usuario: " + (registroExitoso ? "Exitoso" : "Fallido"));

        // Intentar autenticar el usuario registrado
        boolean autenticado = auth.autenticarLogin("user1", "password1");
        System.out.println("Autenticación: " + (autenticado ? "Exitosa" : "Fallida"));

        
    }
}

