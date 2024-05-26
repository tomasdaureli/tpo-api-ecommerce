import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Autenticacion {
    public boolean autenticarLogin(String username, String password) {
        try (Connection conn = BaseDeDatos.getConnection()) {
            String query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean registrarUsuario(Usuario usuario) {
        try (Connection conn = BaseDeDatos.getConnection()) {
            String query = "INSERT INTO usuarios (username, password, email) VALUES (?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, usuario.getUsername());
            ps.setString(2, usuario.getPassword());
            ps.setString(3, usuario.getEmail());
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    
    
}
}
