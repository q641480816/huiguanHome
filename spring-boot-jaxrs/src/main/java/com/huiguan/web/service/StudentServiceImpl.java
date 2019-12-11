//package com.huiguan.web.service;
//
//import java.util.Collection;
//
//import javax.ws.rs.core.Response;
//
//import com.huiguan.web.exception.StudentNotFoundException;
//import com.huiguan.web.model.Student;
//import com.huiguan.web.repository.StudentRepository;
//
//public class StudentServiceImpl implements StudentService {
//
//	private final StudentRepository repository;
//
//	public StudentServiceImpl(StudentRepository repository) {
//		this.repository = repository;
//	}
//
//	@Override
//	public Collection<Student> getAllStudents() {
//		return repository.findAll();
//	}
//
//	@Override
//	public Response getById(Long id) {
//		Student student = repository.findById(id).orElseThrow(StudentNotFoundException::new);
//		return Response.ok(student).build();
//	}
//
//}
