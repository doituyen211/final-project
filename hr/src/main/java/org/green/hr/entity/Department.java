package org.green.hr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@lombok.Getter
@lombok.Setter

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "department")
public class Department {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Size(max = 255)
  @NotNull
  @Column(name = "department_name", nullable = false)
  private String departmentName;

  @Size(max = 255)
  @Column(name = "description")
  private String description;

  @Column(name = "status")
  private Boolean status;

  @Column(name = "create_at")
  private Date createAt;

  @Column(name = "update_at")
  private Date updateAt;

  @OneToMany(mappedBy = "department", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE,
      CascadeType.PERSIST}, orphanRemoval = true)
  private List<Position> positions = new ArrayList<>();

}